from http.server import HTTPServer, BaseHTTPRequestHandler
import cgi
import os
import smtplib
from email.message import EmailMessage

formlist = []

EMAIL_ADDRESS = os.environ.get('g_user')
EMAIL_PASSWORD = os.environ.get('g_pass')


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        try:
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
            # below code fixes photo and resume path issues
            if self.path.endswith('.jpg'):
                f = open('/images/'+self.path, 'rb')
                self.send_response(200)
                self.send_header('Content-type', 'image/png')
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
                # return
        except:
            file_to_open = 'File not found'
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))

        if self.path.endswith('/thankyou.html'):
            # self.send_response(200)
            # self.send_header('content-type', 'text/html')
            # self.end_headers()

            output = f"""
            <html><body id='thanks' style='display:flex;color:cyan; background-color:black; padding: 20px 20px; justify-content:center'>
            <h1>{formlist[0]}! Thank you for reaching out. You will be contacted shortly. You may now close this window or go <a href='index.html'>Home.</a></h1>
            </body></html>
            """

            self.wfile.write(output.encode())
            formlist.clear()

    def do_POST(self):
        if self.path.endswith('/formdata.html'):
            ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
            pdict['boundary'] = bytes(pdict['boundary'], 'utf-8')
            content_len = int(self.headers.get('Content-length'))
            pdict['CONTENT-LENGTH'] = content_len
            if ctype == 'multipart/form-data':
                fields = cgi.parse_multipart(self.rfile, pdict)
                name = fields.get('fname')
                email = fields.get('email')
                textbox = fields.get('textbox')
                formlist.append(name[0])
                formlist.append(email[0])
                formlist.append(textbox[0])
                print(formlist)
            self.send_response(301)
            self.send_header('content-type', 'text/html')
            self.send_header('Location', '/thankyou.html')
            self.end_headers()

            #SENDING EMAIL BELOW
            msg = EmailMessage()
            msg['Subject'] = 'NEW MESSAGE FROM YOUR WEBSITE'
            msg['From'] = EMAIL_ADDRESS
            msg['To'] = EMAIL_ADDRESS
            msg.set_content(f"Name: {formlist[0]}\nEmail: {formlist[1]}\nMessage: {formlist[2]}")
            msg.add_alternative(f"""\
            <!DOCTYPE html>
            <html>
                <body style='background-color:black;'>
                    <h1 style='color:white;'>Name: {formlist[0]}</h1><br>
                    <h1 style='color:white;'>Email: {formlist[1]}</h1><br>
                    <h1 style='color:white;'>Message: {formlist[2]}</h1><br>
                </body>
            </html>
            """, subtype='html')

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)




def main():
    PORT = 8000

    # web_dir = os.path.join(os.path.dirname(__file__), 'web')
    # os.chdir(web_dir);

    server = HTTPServer(('', PORT), RequestHandler)
    print('Server running on port %s' % PORT)
    server.serve_forever()

if __name__ == '__main__':
    main()
