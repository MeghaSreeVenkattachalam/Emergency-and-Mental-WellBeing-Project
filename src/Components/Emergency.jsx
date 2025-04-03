import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Emergency.css";

const Emergency = () => {
  const defaultEmergencyContacts = [
    { name: "Mom", number: "91XXXXXXXXXX" },
    { name: "Dad", number: "91XXXXXXXXXX" },
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" }
  ];

  const [contacts, setContacts] = useState([...defaultEmergencyContacts]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [manualNumber, setManualNumber] = useState("");
  const [newContact, setNewContact] = useState({ name: "", number: "" });

  // Safely retrieve user data from localStorage
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid JSON format in localStorage:", error);
  }

  // Fetch emergency contacts from backend if user is logged in
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8080/api/emergency-contacts/${user.id}`)
        .then((res) => {
          if (Array.isArray(res.data?.contacts)) {
            setContacts([...defaultEmergencyContacts, ...res.data.contacts]);
          }
        })
        .catch((err) => console.error("Error fetching contacts:", err));
    }
  }, [user?.id]);

  // Fetch address from latitude and longitude
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      return response.data.display_name || "Address not available";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not available";
    }
  };

  // Send location via WhatsApp
  const sendLocation = async (number) => {
    if (!number.trim()) {
      alert("Please select or enter a valid number.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const address = await fetchAddress(latitude, longitude);
        const message = `🚨 Emergency! I need help. My location: ${address}`;
        const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to fetch location. Please enable location services.");
      }
    );
  };

  // Send location to all emergency contacts
  const sendToAll = () => {
    let delay = 0;
    contacts.forEach((contact) => {
      setTimeout(() => {
        sendLocation(contact.number);
      }, delay);
      delay += 2000; // Adds 2-second gap between messages
    });
  };

  // Add new contact to the list and backend
  const addContact = async () => {
    if (!newContact.name.trim() || !newContact.number.trim()) {
      alert("Both name and number are required.");
      return;
    }

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    setNewContact({ name: "", number: "" });

    if (user?.id) {
      try {
        await axios.post("http://localhost:8080/api/emergency-contacts", {
          userId: user.id,
          contacts: updatedContacts
        });
      } catch (error) {
        console.error("Error saving contact:", error);
      }
    }
  };

  return (
    <div className="emergency-container">
      <h2>Emergency Contacts</h2>

      {/* Select a Contact to Send Location */}
      <div>
        <label>Select a Contact:</label>
        <select onChange={(e) => setSelectedNumber(e.target.value)} defaultValue="">
          <option value="">-- Select --</option>
          {contacts.map((contact) => (
            <option key={contact.number} value={contact.number}>
              {contact.name} ({contact.number})
            </option>
          ))}
        </select>
        <button onClick={() => sendLocation(selectedNumber)}>Send Location</button>
      </div>

      {/* Manually Enter a Contact Number */}
      <div>
        <label>Enter a Number:</label>
        <input
          type="text"
          placeholder="Enter Number"
          value={manualNumber}
          onChange={(e) => setManualNumber(e.target.value)}
        />
        <button onClick={() => sendLocation(manualNumber)}>Send Location</button>
      </div>

      {/* Send to All Saved Contacts */}
      <button onClick={sendToAll}>Send to All</button>

      {/* Display Saved Contacts */}
      <h3>Saved Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.number}>
            {contact.name} - {contact.number}
          </li>
        ))}
      </ul>

      {/* Add New Contact Section */}
      <h3>Add New Contact</h3>
      <input
        type="text"
        placeholder="Name"
        value={newContact.name}
        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Number"
        value={newContact.number}
        onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
      />
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default Emergency;
