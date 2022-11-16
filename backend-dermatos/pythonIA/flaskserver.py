#app = Flask(__name__)
# Load the model
#model = pickle.load(open('model.pkl','rb'))
#@app.route('/api',methods=['POST'])

#def predict():
    # Get the data from the POST request.
  #  data = request.get_json(force=True)
    # Make prediction using model loaded from disk as per the data.
   # prediction = model.predict([[np.array(data['exp'])]])
    # Take the first value of prediction
   # output = prediction[0]
   # return jsonify(output)
#if __name__ == '__main__':
   #    app.run(port=5000, debug=True)

import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from test import receive_resize_img
from test import predict_img
import numpy as np
import pickle
import base64


UPLOAD_FOLDER = 'C:/Users/46919304/Documents/GitHub/Dermatos/backend-dermatos/pythonIA/image'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# def allowed_file(filename):
#      return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           

@app.route('/flask', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # # check if the post request has the file part
        # if 'imagen' not in request.files:
        #     flash('No file part')
        #     return redirect(request.url)
        # file = request.files['imagen']
        # # If the user does not select a file, the browser submits an
        # # empty file without a filename.
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        # if file and allowed_file(file.filename):
        #     filename = secure_filename(file.filename)
        #     filename = "img_temp."+filename.rsplit('.', 1)[1].lower()
        #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


        f = request.data[1] 
        decodedImg = base64.b64decode(f)   
        print(decodedImg)    

        filename = secure_filename(decodedImg.filename)
        fi = os.path.join(UPLOAD_FOLDER, filename)

        decodedImg.save(fi)
        print(fi)
        # f.save(app.config['UPLOAD_FOLDER'] + "/" + filename)
        # file = open(app.config['UPLOAD_FOLDER'] + filename,"r")        

        return predict_img(receive_resize_img(fi))
        
if __name__ == '__main__':
      #app.run(port=8080, debug=True)
    app.run(host='127.0.0.1',port=8080,debug=True)
    

    