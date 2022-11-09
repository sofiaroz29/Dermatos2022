import requests
url = 'http://localhost:5000/api'
req = requests.post(url,json={'exp':1.8,})
print(req.json())