import unittest
import requests

class UtilsTests(unittest.TestCase):
  def setUp(self):
    self.url_options = "http://localhost:8000/ml_api/options"
    self.url_cmd_flags = "http://localhost:8000/ml_api/cmd-flags"
    self.url_samplers = "http://localhost:8000/ml_api/samplers"
    self.url_upscalers = "http://localhost:8000/ml_api/upscalers"
    self.url_sd_models = "http://localhost:8000/ml_api/sd-models"
    self.url_hypernetworks = "http://localhost:8000/ml_api/hypernetworks"
    self.url_face_restorers = "http://localhost:8000/ml_api/face-restorers"
    self.url_realesrgan_models = "http://localhost:8000/ml_api/realesrgan-models"
    self.url_prompt_styles = "http://localhost:8000/ml_api/prompt-styles"
    self.url_embeddings = "http://localhost:8000/ml_api/embeddings"

  def test_options_get(self):
    self.assertEqual(requests.get(self.url_options).status_code, 200)

  def test_options_write(self):
    response = requests.get(self.url_options)
    self.assertEqual(response.status_code, 200)

    pre_value = response.json()["send_seed"]

    self.assertEqual(requests.post(self.url_options, json={"send_seed":not pre_value}).status_code, 200)

    response = requests.get(self.url_options)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.json()["send_seed"], not pre_value)

    requests.post(self.url_options, json={"send_seed": pre_value})

  def test_cmd_flags(self):
    self.assertEqual(requests.get(self.url_cmd_flags).status_code, 200)

  def test_samplers(self):
    self.assertEqual(requests.get(self.url_samplers).status_code, 200)

  def test_upscalers(self):
    self.assertEqual(requests.get(self.url_upscalers).status_code, 200)

  def test_sd_models(self):
    self.assertEqual(requests.get(self.url_sd_models).status_code, 200)

  def test_hypernetworks(self):
    self.assertEqual(requests.get(self.url_hypernetworks).status_code, 200)

  def test_face_restorers(self):
    self.assertEqual(requests.get(self.url_face_restorers).status_code, 200)
  
  def test_realesrgan_models(self):
    self.assertEqual(requests.get(self.url_realesrgan_models).status_code, 200)
  
  def test_prompt_styles(self):
    self.assertEqual(requests.get(self.url_prompt_styles).status_code, 200)

  def test_embeddings(self):
    self.assertEqual(requests.get(self.url_embeddings).status_code, 200)

if __name__ == "__main__":
    unittest.main()
