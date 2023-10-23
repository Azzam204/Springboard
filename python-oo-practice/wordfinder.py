"""Word Finder: finds random words from a dictionary."""
from random import choice


class WordFinder:
    ''' accepts a file with words creates a list and can return random words'''
    def __init__(self, file):
        self.file = open(file,'r')
        self.words = []
        for word in self.file:
            self.words.append(word[:-1:])
        self.file.close()
        print(f'{len(self.words)} words read')

    def __repr__(self):
        return f'{len(self.words)} words read'
    
    def random(self):
        return choice(self.words)