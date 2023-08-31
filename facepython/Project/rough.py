import json
import cv2
import numpy as np
import face_recognition
import os
import requests
from datetime import datetime
from PIL import Image
from io import BytesIO

url = 'http://localhost:5000/api/py-fetch'
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    # print(data)
    output_dir = os.getcwd()+'/Proj-Photos'
    # //save each file in files in the Proj-Photos with file name as roll 
    for file in data['files']:
        fileUrl = 'http://localhost:5000/api/v1/auth/file/'+file['_id']
        fileName = file['rollno']+'.jpeg'
        fileRes = requests.get(fileUrl)
        image = Image.open(BytesIO(fileRes.content))
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, fileName)
        image.save(output_path, format="JPEG")
    # //Todo

    # Rewrite the json to accomodates change
    path = os.getcwd()+'/Proj-Photos'
    images = []
    classNames = []
    myList = os.listdir(path)
    # print(myList)
    for cl in myList:
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        classNames.append(os.path.splitext(cl)[0])
    # print(classNames)
    # print(images)
    validIndList = []
    def findEncodings(images):
        encodeList = []
        cnt = 0
        for img in images:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            encodeImgList = face_recognition.face_encodings(img)
            if len(encodeImgList) >=1:
                validIndList.append(cnt)
                # print('Yes')
                encode = encodeImgList[0]
                encodeList.append(encode)
            cnt+=1
        return encodeList

    encodeListKnown = findEncodings(images)
    classNames = [classNames[i] for i in validIndList]
    # print('Encoding Complete')

    cap = cv2.VideoCapture(0)
    

    recognized_names = [] # keep track of recognized names
    found = 0
    while True and found == 0:
        
        success, img = cap.read()
        # print(img.shape)
        imgS = cv2.resize(img, (0, 0), fx = 0.25, fy=0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                print(name)
                found = 1

                if name not in recognized_names: # write to JSON only for new names
                    recognized_names.append(name)

                    y1, x2, y2, x1 = faceLoc
                    y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                    cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                    # Show name and date time on the screen
                    now = datetime.now()
                    date1 = now.strftime("%d/%m/%Y") 
                    time1 = now.strftime("%H:%M:%S")
                    cv2.putText(img, f"{name} - {date1} - {time1}", (x1, y2 + 40), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                    
                    # print("working")

        cv2.imshow('Webcam', img)

        # close webcam on pressing key q
        if cv2.waitKey(2000) == ord('q'):
            break

        # close webcam on pressing key ESC
        # if cv2.waitKey(1) == 27:
        #     break

    # csv.close()
    cap.release()
    cv2.destroyAllWindows()
    # Clear the files Dir 

else:
    # print('API request failed with status code', response.status_code)
    pass
