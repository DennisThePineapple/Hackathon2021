import os
import torch

class Inference:
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=os.path.join('ml', 'weights.pt'))

    def predict(self, file):
        return self.model(file)