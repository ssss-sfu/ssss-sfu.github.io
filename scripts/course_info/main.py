from period import Term, Period, get_current_period
from course import Course
from typing import List
import requests
import json

BASE_URL = "http://www.sfu.ca/bin/wcm/course-outlines"
RESULT_FILE_PATH = "public/jsons/courses.json"
# List of lower-division courses
lower_division_courses: List[Course] = [
    Course("CMPT", "105W"),
    Course("CMPT", "130"),
    Course("CMPT", "135"),
    Course("CMPT", "210"),
    Course("CMPT", "213"),
    Course("CMPT", "225"),
    Course("CMPT", "276"),
    Course("CMPT", "295"),
    Course("MACM", "101"),
    Course("MSE", "110"),
    Course("STAT", "271"),
    Course("MATH", "150"),
    Course("MATH", "151"),
    Course("MATH", "152"),
    Course("MATH", "232"),
]

def get_course_info(subject, number, period = get_current_period()):
    term = period.term.value
    year = period.year
    course_url = f"{BASE_URL}?{year}/{term}/{subject}/{number}"
    course_res = requests.get(course_url)
    if (course_res.status_code == 404):
      ## Recurse to previous term until we get info
      return get_course_info(subject, number, period.previous_period())
    
    ## Status Code here is 200 OK
    course_json = json.loads(course_res.text)
    section = course_json[0]['value']
    section_url = f"{course_url}/{section}"
    section_res = requests.get(section_url)
    return json.loads(section_res.text)

class CourseInfo:
    def __init__(self, course: Course, title: str):
        self.course = course
        self.title = title
    
    def toJson(self):
        return {
            "subject": self.course.subject,
            "number": self.course.number,
            "title": self.title
        }


course_info_list: List[CourseInfo] = []

for course in lower_division_courses:
  data = get_course_info(course.subject, course.number)
  course_info = CourseInfo(course, data['info']['title'])
  course_info_list.append(course_info.toJson())

with open(RESULT_FILE_PATH, 'w') as f:
    json.dump(course_info_list, f)