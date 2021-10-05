from connection import get_data
import sys

def Start():
    return get_data()
    
    
def Canal():
    print(Start())
    sys.stdout.flush()
Canal()