from mitmproxy import http

class AddHeader:
    def __init__(self):
        self.num = 0
 
    def requestheaders(self, flow: mitmproxy.http.HTTPFlow):
        #if flow.request.pretty_host == "example.com":
        print(flow.request)

addons = [
    AddHeader()
]    