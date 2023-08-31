# import csv
# import cv2
# import numpy as np
# import face_recognition
# import os
# from datetime import datetime

# path = os.getcwd()+'/Proj-Photos'
# images = []
# classNames = []
# myList = os.listdir(path)
# print(myList)
# for cl in myList:
#     curImg = cv2.imread(f'{path}/{cl}')
#     images.append(curImg)
#     classNames.append(os.path.splitext(cl)[0])
# print(classNames)

# def findEncodings(images):
#     encodeList = []

#     for img in images:
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         encode = face_recognition.face_encodings(img)[0]
#         encodeList.append(encode)
#     return encodeList

# encodeListKnown = findEncodings(images)
# print('Encoding Complete')

# cap = cv2.VideoCapture(0)

# # Open a CSV file for writing and write header
# with open('face_recognition.csv', mode='w', newline='') as csv_file:
#     fieldnames = ['Name', 'DateTime']
#     writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
#     writer.writeheader()

#     while True:
#         success, img = cap.read()

#         imgS = cv2.resize(img, (0, 0), fx = 0.25, fy=0.25)
#         imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

#         facesCurFrame = face_recognition.face_locations(imgS)
#         encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

#         for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
#             matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
#             faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

#             matchIndex = np.argmin(faceDis)

#             if matches[matchIndex]:
#                 name = classNames[matchIndex].upper()

#                 y1, x2, y2, x1 = faceLoc
#                 y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
#                 cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#                 cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
#                 cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

#                 # Show name and date time on the screen
#                 now = datetime.now()
#                 dtString = now.strftime("%m/%d/%Y %H:%M:%S")
#                 cv2.putText(img, f"{name} - {dtString}", (x1, y2 + 40), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

#                 # Write name and date time to CSV file
#                 writer.writerow({'Name': name, 'DateTime': dtString})

#         cv2.imshow('Webcam', img)

#         # Close webcam window on pressing 'q' key
#         if cv2.waitKey(1) == ord('q'):
#             break

# # Close the CSV file and release resources
# csv_file.close()
# cap.release()
# cv2.destroyAllWindows()





# import csv
# import cv2
# import numpy as np
# import face_recognition
# import os
# from datetime import datetime

# path = os.getcwd()+'/Proj-Photos'
# images = []
# classNames = []
# myList = os.listdir(path)
# print(myList)
# for cl in myList:
#     curImg = cv2.imread(f'{path}/{cl}')
#     images.append(curImg)
#     classNames.append(os.path.splitext(cl)[0])
# print(classNames)

# def findEncodings(images):
#     encodeList = []

#     for img in images:
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         encode = face_recognition.face_encodings(img)[0]
#         encodeList.append(encode)
#     return encodeList

# encodeListKnown = findEncodings(images)
# print('Encoding Complete')

# cap = cv2.VideoCapture(0)

# # Check if the CSV file already exists and write header if not
# if not os.path.isfile('face_recognition.csv'):
#     with open('face_recognition.csv', mode='w', newline='') as csv_file:
#         fieldnames = ['Name', 'DateTime']
#         writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
#         writer.writeheader()

# recognized_names = [] # keep track of recognized names

# while True:
#     success, img = cap.read()

#     imgS = cv2.resize(img, (0, 0), fx = 0.25, fy=0.25)
#     imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

#     facesCurFrame = face_recognition.face_locations(imgS)
#     encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

#     for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
#         matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
#         faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

#         matchIndex = np.argmin(faceDis)

#         if matches[matchIndex]:
#             name = classNames[matchIndex].upper()

#             if name not in recognized_names: # write to CSV only for new names
#                 recognized_names.append(name)

#                 y1, x2, y2, x1 = faceLoc
#                 y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
#                 cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#                 cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
#                 cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

#                 # Show name and date time on the screen
#                 now = datetime.now()
#                 dtString = now.strftime("%m/%d/%Y %H:%M:%S")
#                 cv2.putText(img, f"{name} - {dtString}", (x1, y2 + 40), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                
#                 # Write name and date time to CSV file
#                 with open('face_recognition.csv', mode='a', newline='') as csvfile:
#                     writer = csv.writer(csvfile)
#                     writer.writerow([name, dtString])

#         cv2.imshow('Webcam', img)

#         # Close webcam window on pressing 'q' key
#         if cv2.waitKey(1) == ord('q'):
#             break

# # Close the CSV file and release resources
# csv.close()
# cap.release()
# cv2.destroyAllWindows()







import json
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

path = os.getcwd()+'/Proj-Photos'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)

def findEncodings(images):
    encodeList = []

    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

encodeListKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)

# Check if the JSON file already exists and write header if not
if not os.path.isfile('face_recognition.json'):
    with open('face_recognition.json', mode='w') as json_file:
        json.dump([], json_file)

recognized_names = [] # keep track of recognized names

while True:
    success, img = cap.read()

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

            if name not in recognized_names: # write to JSON only for new names
                recognized_names.append(name)

                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                # Show name and date time on the screen
                now = datetime.now()
                dtString = now.strftime("%m/%d/%Y %H:%M:%S")
                cv2.putText(img, f"{name} - {dtString}", (x1, y2 + 40), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                
                # Write name and date time to JSON file
                with open('face_recognition.json', mode='r') as json_file:
                    data = json.load(json_file)

                data.append({
                    'Name': name,
                    'DateTime': dtString
                })

                with open('face_recognition.json', mode='w') as json_file:
                    json.dump(data, json_file)

    cv2.imshow('Webcam', img)

    # close webcam on pressing key q
    if cv2.waitKey(1) == ord('q'):
        break

    # close webcam on pressing key ESC
    # if cv2.waitKey(1) == 27:
    #     break

# csv.close()
cap.release()
cv2.destroyAllWindows()
