from tensorflow.examples.tutorials.mnist import input_data
from PIL import Image
import tensorflow as tf
import tensorflow_probability as tfp
import numpy as np

tfd = tfp.distributions


MODEL_PATH = 'ml_model/vmf_model'


class GenerativeModel:

    def __init__(self):
        self.sess = tf.Session()
        # First let's load meta graph and restore weights
        saver = tf.train.import_meta_graph(f'{MODEL_PATH}.meta')
        saver.restore(self.sess, MODEL_PATH)
        graph = tf.get_default_graph()
        self.data = graph.get_tensor_by_name("inputx:0")
        self.decoder = graph.get_tensor_by_name("decoder_1/personal_decoder:0")

    def generate(self):
        mnist = input_data.read_data_sets('MNIST_data/')
        feed = {self.data: mnist.train.next_batch(1)[0].reshape([-1, 28, 28])}

        samples = tfd.Independent(tfd.Bernoulli(self.decoder), 2).mean()
        images_generated = self.sess.run(samples, feed)
        image_generated = images_generated[0, :, :]
        return Image.fromarray(np.uint8(image_generated*255))
