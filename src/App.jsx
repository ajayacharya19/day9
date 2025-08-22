import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", rollNo: "", department: "", marks: "" });

  // Fetch students
  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => setStudents(res.data));
  }, []);

  // Add student
  const addStudent = async () => {
    await axios.post("http://localhost:5000/students", form);
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 Student Management</h1>

      <h2>Add Student</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Roll No"
        onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
      />
      <input
        placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <input
        placeholder="Marks"
        type="number"
        onChange={(e) => setForm({ ...form, marks: e.target.value })}
      />
      <button onClick={addStudent}>Add</button>

      <h2>All Students</h2>
      <ul>
        {students.map((s, index) => (
          <li key={index}>
            {s.name} ({s.rollNo}) - {s.department} - Marks: {s.marks}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
