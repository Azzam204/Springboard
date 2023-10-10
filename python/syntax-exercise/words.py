def print_upper_words(words):
    ''' prints given words in all caps'''
    for word in words:
        print(word.upper())
    
def print_upper_words2(words,must_start_with):
    """ loops through words, prints words that start with must start with letters in all caps"""

    for word in words:
        for letter in must_start_with:
            if word.upper().startswith(letter.upper()):
                print(word.upper())