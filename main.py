from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import tensorflow as tf
import math
import EdgeGPT
from gtts import gTTS
from playsound import playsound
import speech_recognition as sr
from pydub import AudioSegment
import openai
from EdgeGPT.EdgeGPT import Chatbot, ConversationStyle
r = sr.Recognizer()
import os
import asyncio
import re
import keyboard
from elevenlabs import generate, play, voices,set_api_key, save
import flask
from flask import render_template as RT, Flask as fk, send_file as sf, request as rq
import smtplib, ssl

port = 465  # For SSL
password = "password"

# Create a secure SSL context
context = ssl.create_default_context()

set_api_key("api_key")
voice1 = voices()
count = 0

def rem(inp):
    try:
        inp = inp.replace("*","")
        for i in range(10):
            inp = inp.replace(f"[^{i}^]","")
        return inp
    except:
        return inp

app = fk(__name__)

@app.route("/")
def main():
    return RT("index.html")

@app.route("/delete/",methods=['GET','POST'])
def delete():
    if rq.method == "POST":
        try:
            trg = int(rq.get_json(force=True))
            os.remove(f"static/{trg}.mp3")
            return "sucsess"
        except:
            print("invalid delete request")
            return "invalid delete"

@app.route("/audio/", methods=['GET','POST'])
def testpost():
    #return f"A,maintainance,Down for maintaince"
    global count
    if rq.method == "POST":
        words = rq.get_json(force=True)
        try:
            bot = Chatbot()
            bing_resp = asyncio.run(bot.ask(prompt=words, conversation_style=ConversationStyle.precise))
            fin = bing_resp['item']['messages'][-1]['text']
            fin = rem(fin)
            ret = fin
        except Exception as exe:
            """
            with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
                server.login("email@email.com", password)
                server.sendmail("email@email.com", "email@email.com", str(exe))
            """
            return f"A,pleaseRepeat,{str(exe)}"
        try:
            #print(blah)
            """
            audio = generate(
                text=ret,
                voice=voice1[-1],
                model="eleven_monolingual_v1"
            )
            """
            count += 1
            myobj = gTTS(text=fin, lang='en', slow=False, tld="com.au")
            myobj.save(f"static/{count}.mp3")
            #save(audio,f"static/{count}.mp3")
            return f"{count},{str(count)},{ret}"
        except Exception as Err:
            with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
                server.login("email@email.com", password)
                server.sendmail("email@email.com", "email@email.com", str(Err))
            return f"A,maintainance,{ret}"
    return "Not a post rq"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=False)
