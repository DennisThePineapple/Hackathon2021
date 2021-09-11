import torch

class Inference:
    def __init__(self) -> None:
        self.model = torch.hub.load('ultralytics/yolov5', 'custom', path='model\\weights.pt')

    def predict(self, file):
        return self.model(file)