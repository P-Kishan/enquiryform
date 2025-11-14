import React, { useState, useEffect } from "react";
import "./enquiryForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); 

 
  // Fetch enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/enquiry/view");
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Error fetching enquiries!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  //Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add enquiry
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/enquiry/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Enquiry added successfully!");
        setUsers((prev) => [...prev, data]);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setShowForm(false); 
      } else {
        toast.error("Failed to add enquiry!");
      }
    } catch (error) {
      toast.error("Error adding enquiry!");
    } finally {
      setLoading(false);
    }
  };

  // Update enquiry
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/enquiry/update/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        toast.success("Enquiry updated successfully!");
        setUsers((prev) =>
          prev.map((item) =>
            item._id === editId ? { ...item, ...formData } : item
          )
        );
        setFormData({ name: "", email: "", phone: "", message: "" });
        setEditId(null);
        setShowForm(false); 
      } else {
        toast.error("Failed to update enquiry!");
      }
    } catch (error) {
      toast.error("Error updating enquiry!");
    } finally {
      setLoading(false);
    }
  };

  // Delete enquiry
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/enquiry/delete/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        toast.success("Enquiry deleted!");
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        toast.error("Failed to delete enquiry!");
      }
    } catch (error) {
      toast.error("Error deleting enquiry!");
    } finally {
      setLoading(false);
    }
  };

  // Edit enquiry
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      message: user.message,
    });
    setEditId(user._id);
    setShowForm(true); 
  };

  //  Render
  return (
    <div className="main-container">
      <ToastContainer position="top-center" autoClose={2000} />

      {loading && <div className="loader">Loading...</div>}

      {/*  New Enquiry Button */}
      <button
        className="new-enquiry-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "New Enquiry"}
      </button>

      {/* Enquiry Form (Expandable) */}
      <div className={`form-section ${showForm ? "active" : ""}`}>
        <h2>{editId ? "Update Enquiry" : "New Enquiry"}</h2>
        <form
          onSubmit={editId ? handleUpdate : handleAdd}
          className="enquiry-form"
        >
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Your Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {editId ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* Enquiry List */}
      <div className="list-section">
        <h2>Enquiry List</h2>
        <table>
          <thead>
            <tr>
              <th>SR NO</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>MESSAGE</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.message}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryForm;
