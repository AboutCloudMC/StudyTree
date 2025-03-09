from flask import Flask, request, render_template, redirect, url_for
from google import genai
import markdown
import os

app = Flask(__name__, template_folder="templates")

result = ""

@app.route("/", methods=["GET", "POST"])
def index():
    global result
    if request.method == "POST":
        user_input = request.form.get('topic')

        if user_input:
            client = genai.Client(api_key=os.getenv("KEY"))
            prompt = f"Write an article over the following topic for a study website.\nTopic: {user_input}"

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )
            result = markdown.markdown(response.text)
        else:
            result = "No input provided."

        # Redirect to the '/button' route after processing
        #return redirect(url_for("button"))
        return render_template("info/info.html", text=result)

    return render_template("home/home.html", result=result)

@app.route("/button", methods=["GET"])
def button():
    global result
    # Display the result on the info page
    return render_template("info/info.html", text=result)

if __name__ == "__main__":
    app.run(port=1234, debug=True)
