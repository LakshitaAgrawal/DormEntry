# # faceNet.py
# import cv2
# import stow
# import typing
# import numpy as np
# import onnxruntime as ort

# class FaceNet:
#     """FaceNet class object, which can be used for simplified face recognition
#     """
#     def __init__(
#         self, 
#         detector: object,
#         onnx_model_path: str = "models/faceNet.onnx", 
#         anchors: typing.Union[str, dict] = 'faces',
#         force_cpu: bool = False,
#         threshold: float = 0.5,
#         color: tuple = (255, 255, 255),
#         thickness: int = 2,
#         ) -> None:
#         """Object for face recognition
#         Params:
#             detector: (object) - detector object to detect faces in image
#             onnx_model_path: (str) - path to onnx model
#             force_cpu: (bool) - if True, onnx model will be run on CPU
#             anchors: (str or dict) - path to directory with faces or dictionary with anchor names as keys and anchor encodings as values
#             threshold: (float) - threshold for face recognition
#             color: (tuple) - color of bounding box and text
#             thickness: (int) - thickness of bounding box and text
#         """
#         if not stow.exists(onnx_model_path):
#             raise Exception(f"Model doesn't exists in {onnx_model_path}")

#         self.detector = detector
#         self.threshold = threshold
#         self.color = color
#         self.thickness = thickness

#         providers = ['CUDAExecutionProvider', 'CPUExecutionProvider']

#         providers = providers if ort.get_device() == "GPU" and not force_cpu else providers[::-1]

#         self.ort_sess = ort.InferenceSession(onnx_model_path, providers=providers)

#         self.input_shape = self.ort_sess._inputs_meta[0].shape[1:3]
        
#         self.anchors = self.load_anchors(anchors) if isinstance(anchors, str) else anchors

#     def normalize(self, img: np.ndarray) -> np.ndarray:
#         """Normalize image

#         Args:
#             img: (np.ndarray) - image to be normalized

#         Returns:
#             img: (np.ndarray) - normalized image
#         """
#         mean, std = img.mean(), img.std()
#         return (img - mean) / std

#     def l2_normalize(self, x: np.ndarray, axis: int = -1, epsilon: float = 1e-10) -> np.ndarray:
#         """l2 normalization function

#         Args:
#             x: (np.ndarray) - input array
#             axis: (int) - axis to normalize
#             epsilon: (float) - epsilon to avoid division by zero

#         Returns:
#             x: (np.ndarray) - normalized array
#         """
#         output = x / np.sqrt(np.maximum(np.sum(np.square(x), axis=axis, keepdims=True), epsilon))
#         return output

#     def detect_save_faces(self, image: np.ndarray, output_dir: str = "faces"):
#         """Detect faces in given image and save them to output_dir

#         Args:
#             image: (np.ndarray) - image to be processed
#             output_dir: (str) - directory where faces will be saved

#         Returns:
#             bool: (bool) - True if faces were detected and saved
#         """
#         face_crops = [image[t:b, l:r] for t, l, b, r in self.detector(image, return_tlbr=True)]

#         if face_crops == []: 
#             return False

#         stow.mkdir(output_dir)

#         for index, crop in enumerate(face_crops):
#             output_path = stow.join(output_dir, f"face_{str(index)}.png")
#             cv2.imwrite(output_path, crop)
#             print("Crop saved to:", output_path)

#         self.anchors = self.load_anchors(output_dir)
        
#         return True

#     def load_anchors(self, faces_path: str):
#         """Generate anchors for given faces path

#         Args:
#             faces_path: (str) - path to directory with faces

#         Returns:
#             anchors: (dict) - dictionary with anchor names as keys and anchor encodings as values
#         """
#         anchors = {}
#         if not stow.exists(faces_path):
#             return {}

#         for face_path in stow.ls(faces_path):
#             anchors[stow.basename(face_path)] = self.encode(cv2.imread(face_path.path))

#         return anchors

#     def encode(self, face_image: np.ndarray) -> np.ndarray:
#         """Encode face image with FaceNet model

#         Args 
#             face_image: (np.ndarray) - face image to be encoded
            
#         Returns:
#             face_encoding: (np.ndarray) - face encoding
#         """
#         face = self.normalize(face_image)
#         face = cv2.resize(face, self.input_shape).astype(np.float32)

#         encode = self.ort_sess.run(None, {self.ort_sess._inputs_meta[0].name: np.expand_dims(face, axis=0)})[0][0]
#         normalized_encode = self.l2_normalize(encode)

#         return normalized_encode

#     def cosine_distance(self, a: np.ndarray, b: typing.Union[np.ndarray, list]) -> np.ndarray:
#         """Cosine distance between wectors a and b

#         Args:
#             a: (np.ndarray) - first vector
#             b: (np.ndarray) - second list of vectors

#         Returns:
#             distance: (float) - cosine distance
#         """
#         if isinstance(a, list):
#             a = np.array(a)

#         if isinstance(b, list):
#             b = np.array(b)

#         return np.dot(a, b.T) / (np.linalg.norm(a) * np.linalg.norm(b))

#     def draw(self, image: np.ndarray, face_crops: dict):
#         """Draw face crops on image

#         Args:
#             image: (np.ndarray) - image to be drawn on
#             face_crops: (dict) - dictionary with face crops as values and face names as keys

#         Returns:
#             image: (np.ndarray) - image with drawn face crops
#         """
#         for value in face_crops.values():
#             t, l, b, r = value["tlbr"]
#             cv2.rectangle(image, (l, t), (r, b), self.color, self.thickness)
#             cv2.putText(image, stow.name(value['name']), (l, t - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, self.color, self.thickness)

#         return image

#     def __call__(self, frame: np.ndarray) -> np.ndarray:
#         """Face recognition pipeline

#         Args:
#             frame: (np.ndarray) - image to be processed

#         Returns:
#             frame: (np.ndarray) - image with drawn face recognition results
#         """
#         face_crops = {index: {"name": "Unknown", "tlbr": tlbr} for index, tlbr in enumerate(self.detector(frame, return_tlbr=True))}
#         for key, value in face_crops.items():
#             t, l, b, r = value["tlbr"]
#             face_encoding = self.encode(frame[t:b, l:r])
#             distances = self.cosine_distance(face_encoding, list(self.anchors.values()))
#             if np.max(distances) > self.threshold:
#                 face_crops[key]["name"] = list(self.anchors.keys())[np.argmax(distances)]

#         frame = self.draw(frame, face_crops)

#         return frame


#!/usr/bin/python
"""
This program is demonstration for face and object detection using haar-like features.
The program finds faces in a camera image or video stream and displays a red box around them.

Original C implementation by:  ?
Python implementation by: Roman Stanchak, James Bowman
https://github.com/sightmachine/SimpleCV#mac-os-x-106-and-above
"""
import sys
import cv2
from optparse import OptionParser

# * Parameters for haar detection
# * From the API:
# * The default parameters (scale_factor=2, min_neighbors=3, flags=0) are tuned
# * for accurate yet slow object detection. For a faster operation on real video
# * images the settings are:
# * scale_factor=1.2, min_neighbors=2, flags=CV_HAAR_DO_CANNY_PRUNING,
# * min_size=<minimum possible face size

min_size = (20, 20)
image_scale = 2
haar_scale = 1.2
min_neighbors = 2
haar_flags = 0

def detect_and_draw(img, cascade):
    # allocate temporary images
    gray = cv2.CreateImage((img.width,img.height), 8, 1)
    small_img = cv2.CreateImage((cv2.Round(img.width / image_scale),
             cv2.Round (img.height / image_scale)), 8, 1)

    # convert color input image to grayscale
    cv2.CvtColor(img, gray, cv2.CV_BGR2GRAY)

    # scale input image for faster processing
    cv2.Resize(gray, small_img, cv2.CV_INTER_LINEAR)

    cv2.EqualizeHist(small_img, small_img)

    if(cascade):
        t = cv2.GetTickCount()
        faces = cv2.HaarDetectObjects(small_img, cascade, cv2.CreateMemStorage(0),
                                     haar_scale, min_neighbors, haar_flags, min_size)
        t = cv2.GetTickCount() - t
        print("detection time = %gms" % (t/(cv2.GetTickFrequency()*1000.)))
        if faces:
            for ((x, y, w, h), n) in faces:
                # the input to cv.HaarDetectObjects was resized, so scale the
                # bounding box of each face and convert it to two CvPoints
                pt1 = (int(x * image_scale), int(y * image_scale))
                pt2 = (int((x + w) * image_scale), int((y + h) * image_scale))
                cv2.Rectangle(img, pt1, pt2, cv2.RGB(255, 0, 0), 3, 8, 0)

    cv2.ShowImage("result", img)

if __name__ == '__main__':

    parser = OptionParser(usage = "usage: %prog [options] [filename|camera_index]")
    parser.add_option("-c", "--cascade", action="store", dest="cascade", type="str", help="Haar cascade file, default %default", default = "/usr/local/Cellar/opencv/2.2/share/opencv/haarcascades/haarcascade_frontalface_default.xml")
    (options, args) = parser.parse_args()

    cascade = cv2.Load(options.cascade)

    if len(args) != 1:
        parser.print_help()
        sys.exit(1)

    input_name = args[0]
    if input_name.isdigit():
        capture = cv2.CreateCameraCapture(int(input_name))
    else:
        capture = None

    cv2.NamedWindow("result", 1)

    if capture:
        frame_copy = None
        while True:
            frame = cv2.QueryFrame(capture)
            if not frame:
                cv2.WaitKey(0)
                break
            if not frame_copy:
                frame_copy = cv2.CreateImage((frame.width,frame.height),
                                            cv2.IPL_DEPTH_8U, frame.nChannels)
            if frame.origin == cv2.IPL_ORIGIN_TL:
                cv2.Copy(frame, frame_copy)
            else:
                cv2.Flip(frame, frame_copy, 0)

            detect_and_draw(frame_copy, cascade)

            if cv2.WaitKey(10) >= 0:
                break
    else:
        image = cv2.LoadImage(input_name, 1)
        detect_and_draw(image, cascade)
        cv2.WaitKey(0)

    cv2.DestroyWindow("result")





# import cv2
# import numpy as np
# import face_recognition
# import os
# import pymongo
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

# # MongoDB Connection
# myclient = pymongo.MongoClient("mongodb+srv://priyanshibr:9zECnmNkBL2S54UC@dormEntry.mongodb.net/livedata?retryWrites=true&w=majority")
# mydb = myclient["livedata"]
# mycol = mydb["test"]

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

#             y1, x2, y2, x1 = faceLoc
#             y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
#             cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#             cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
#             cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

#             # Show name and date time on the screen
#             now = datetime.now()
#             dtString = now.strftime("%m/%d/%Y %H:%M:%S")
#             cv2.putText(img, f"{name} - {dtString}", (x1, y2 + 40), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

#             # Inserting data into MongoDB
#             mydict = {"name": name, "datetime": dtString}
#             x = mycol.insert_one(mydict)

#     cv2.imshow('Webcam', img)
    
#     # Close webcam window on pressing 'q' key
#     if cv2.waitKey(1) == ord('q'):
#         break
        
# cap.release()
# cv2.destroyAllWindows()

