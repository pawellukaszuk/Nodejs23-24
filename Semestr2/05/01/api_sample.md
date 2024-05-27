## CRUD dla Studenta

CREATE

	POST /students

READ

	GET /students
	GET /students/:studentId

UPDATE

	PATCH /students/:studentId

DELETE

	DELETE /students/:studentId

## CRUD dla Szkoły

CREATE

	POST /schools

READ

	GET /schools
	GET /schools/:schoolId

UPDATE

	PATCH /schools/:schoolId

DELETE

	DELETE /schools/:schoolId

### Dodawanie kursów do szkoły
	POST /schools/:schoolId/courses

### Listowanie kursów w danej szkole, z wyszukiwaniem po nazwie i roku startu
	GET /schools/:schoolId/courses	
	GET /schools/:schoolId/courses/:courseId
	GET /schools/:schoolId/courses?startYear={query_start_year}&name={query_name}

### Dodawania wykładów do kursów
	POST /schools/:schoolId/courses/:courseId/lectures

### Listowanie wykładów w ramach kursu w danej szkole
	GET /schools/:schoolId/courses/:courseId/lectures

### Zapisywanie studentów na kurs w danej szkole
	POST /schools/:schoolId/courses/:courseId/students
