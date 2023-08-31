import face_recognition
import cv2
import numpy as np
import csv
import os
# import glob
from datetime import datetime

video_capture = cv2.VideoCapture(0)

pri_img = face_recognition.load_image_file("Proj-Photos/pri.JPG")
pri_encoding = face_recognition.face_encodings(pri_img)[0]

# nish_img = face_recognition.load_image_file("Proj-Photos/nish.JPG")
# nish_encoding = face_recognition.face_encodings(nish_img)[0]

lakshita_img = face_recognition.load_image_file("Proj-Photos/lakshita.jpeg")
lakshita_encoding = face_recognition.face_encodings(lakshita_img)[0]



known_face_encoding = [
    pri_encoding,
    #nish_encoding,
    lakshita_encoding
]

know_faces_names = [
    "Priyanshi Babbar",
    #"Nishant Sharma",
    "Lakshita Agrawal"
]

students = know_faces_names.copy()

face_locations = []
face_encodings = []
face_names = []
s = True


now = datetime.now()
current_date = now.strftime("%Y-%m-%d")

f = open(current_date+ '.csv', 'w+', newline='')
lnwriter = csv.writer(f)

while True:
    _,frame = video_capture.read()

    # h, w = frame.shape[:2]
    # new_w, new_h = int(w * 0.25), int(h * 0.25)
    # small_frame = cv2.resize(frame,(0,0), new_w, new_h)


    small_frame = cv2.resize(frame,(0,0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:,:,::-1]
    if s:
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations, num_jitters=1)
        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encoding, face_encoding)

            name = ""
            face_distance = face_recognition.face_distance(known_face_encoding, face_encoding)
            best_match_index = np.argmin(face_distance)

            if matches[best_match_index]:
                name = know_faces_names[best_match_index]

            face_names.append(name)
            if name in know_faces_names:
                if name in students:
                    students.remove(name)
                    print(students)
                    current_time = now.strftime("%H-%M-%S")
                    lnwriter.writerow([name, current_time])
    
    cv2.imshow("Attendance System", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
f.close()                

