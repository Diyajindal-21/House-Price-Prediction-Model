from flask import Flask,jsonify,request
from flask_cors import CORS
import util
app=Flask(__name__)
CORS(app)
util.load_saved_artifacts()
@app.route('/location',methods=['GET'])
def location():
    response = jsonify({'locations': util.get_location_names()})
    return response
@app.route('/area',methods=['GET'])
def area():
    response = jsonify({'area': util.get_area_names()})
    return response

@app.route('/predict',methods=['POST'])
def predict_house_price():
    data = request.get_json()
    sqft = float(data.get('sqft', 0))
    bhk = int(data.get('bhk', 0))
    area = data.get('area', '')
    bathroom = int(data.get('bathroom', 0))
    balcony = int(data.get('balcony', 0))
    location = data.get('location', '')
    response=jsonify({
        'price':util.get_estimated_price(location,sqft,bhk,area,bathroom,balcony)
    })
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    print('Starting Python Flask Server For Home Price Prediction...')
    app.run(debug=True)