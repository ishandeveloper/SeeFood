import tensorflow.keras
from PIL import Image
from time import sleep
import numpy as np
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import webbrowser

import cv2

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

img_counter = 0

while True:
    ret, frame = cam.read()
    cv2.imshow("test", frame)
    if not ret:
        break
    k = cv2.waitKey(1)

    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE pressed
        img_name = "opencv_frame_{}.png".format(0)
        cv2.imwrite(img_name, frame)
        print("{} written!".format(img_name))
        img_counter += 1

cam.release()

cv2.destroyAllWindows()


# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = tensorflow.keras.models.load_model('keras_model.h5')

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1.
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

# Replace this with the path to your image
image = Image.open('opencv_frame_0.png')

# Make sure to resize all images to 224, 224 otherwise they won't fit in the array
image=image.resize((224, 224))
image_array = np.asarray(image)




# Normalize the image
normalized_image_array = image_array / 255.0

# Load the image into the array
data[0] = normalized_image_array

# run the inference
prediction = model.predict(data)*100
print(prediction)
#print(prediction.size)


if(prediction[0][0]>25 and prediction[0][1]>25):
    sleep(3)
    webbrowser.open('applebanana.html')
elif(prediction[0][0]>40):
    print("Apple")
    sleep(3)
    webbrowser.open('apple.html')
   
elif(prediction[0][1]>40):
    print("Banana")
    sleep(3)
    webbrowser.open('banana.html')
    
    


