import face_recognition
import cv2
import numpy as np
import csv
import os
from datetime import datetime
import time

video_capture = cv2.VideoCapture(0)
time.sleep(2) # wait for 2 seconds to allow camera to start up properly


try:
    pri_img = face_recognition.load_image_file("Proj-Photos/pri.JPG")
    pri_encoding = face_recognition.face_encodings(pri_img)[0]

    lakshita_img = face_recognition.load_image_file("Proj-Photos/lakshita.jpeg")
    lakshita_encoding = face_recognition.face_encodings(lakshita_img)[0]

    known_face_encoding = [
        pri_encoding,
        lakshita_encoding
    ]

    know_faces_names = [
        "Priyanshi Babbar",
        "Lakshita Agrawal"
    ]

    students = know_faces_names.copy()
except Exception as e:
    print("Error: ", e)
    exit()

face_locations = []
face_locations = [face_locations]
face_encodings = []
face_names = []

now = datetime.now()
current_date = now.strftime("%Y-%m-%d")

f = open(current_date+ '.csv', 'w+', newline='')
lnwriter = csv.writer(f)

while True:
    _, frame = video_capture.read()

    small_frame = cv2.resize(frame,(0,0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:,:,::-1]

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
            try:
                know_faces_names.remove(name)
                print(know_faces_names)
                current_time = now.strftime("%H-%M-%S")
                lnwriter.writerow([name, current_time])
            except ValueError:
                pass
    
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.7, (255, 255, 255), 1)

    cv2.imshow("Attendance System", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


video_capture.release()
cv2.destroyAllWindows()
f.close()

time.sleep(50)  # wait for 5 seconds before closing the window
