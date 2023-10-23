"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    

    def __init__(self,start):
        ''' create serial generator starting at a given number'''
        self.start = start
        self.counter = -1

    def generate(self):
        if self.counter == -1:
            self.counter += 1
            return self.start
        self.counter += 1
        return self.start + self.counter
    
    def reset(self):
        self.counter = -1