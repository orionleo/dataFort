from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello I am here to help you"

@app.route("/sms", methods=['POST'])
def reply():
    msg = request.form.get('Body')
    if(msg.lower() == "application status"):
    	reply = "Predicted disease: \n Grape: Black Rot \n Description: \n Black rot is one of the most damaging diseases of grapes. The disease is caused by the fungus Guignardia bidwellii. The fungus can infect the leaves, shoots, berries, tendrils, rachises and cluster stems (peduncles) of grapes. If the disease is not managed early in the season, the impact on grape clusters can be devastating, resulting in complete crop losses. \n Identification/Symptoms: \n Disease development is favored by warm and humid weather. Symptoms of black rot first appear as small yellow spots on leaves. Enlarged spots (lesions) have a dark brownish-red border with tan to dark brown centers. As the infection develops, tiny black dots appear in the lesion, usually in a ring pattern near the border of the lesion. These dots are fungal structures (pycnidia), which contain thousands of spores (conidia) that can infect new tissue. New infections can occur in less than 10 hours at temperatures between 60 to 85 degrees Fahrenheit. \n Disease Management/Treatment: \n For more information, visit the source." 
    else:
    	reply = msg
    response = MessagingResponse()
    response.message(reply)

    return str(response)

if __name__ == "__main__":
    app.run(debug=True)
