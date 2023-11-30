from enum import Enum
from datetime import datetime

spring = "spring"
summer = "summer"
fall = "fall"
term_list = [spring, summer, fall]

class Term(Enum):
    SPRING = spring
    SUMMER = summer
    FALL = fall
    def next_term(self):
        current_index = term_list.index(self.value)
        next_index = (current_index + 1) % len(term_list)
        next_term = term_list[next_index]
        return Term(next_term)

    def previous_term(self):
        current_index = term_list.index(self.value)
        previous_index = (current_index - 1) % len(term_list)
        previous_term = term_list[previous_index]
        return Term(previous_term)

class Period:
    def __init__(self, term: Term, year: int):
        if not isinstance(term, Term):
            raise ValueError("Invalid term. Please use values from the Term Enum.")
        if not isinstance(year, int):
            raise ValueError("Year must be an integer.")
        self.term = term
        self.year = year
    
    def previous_period(self):
        previous_term = self.term.previous_term()
        previous_year = self.year - 1 if previous_term == Term.FALL else self.year
        return Period(previous_term, previous_year)

    def next_period(self):
        next_term = self.term.next_term()
        next_year = self.year + 1 if next_term == Term.SPRING else self.year

        return Period(next_term, next_year)

def get_current_period():
    current_datetime = datetime.now()
    current_month = current_datetime.month

    if 1 <= current_month <= 4:
        current_term = Term.SPRING
    elif 5 <= current_month <= 8:
        current_term = Term.SUMMER
    else:
        current_term = Term.FALL
    current_year = current_datetime.year

    return Period(current_term, current_year)

