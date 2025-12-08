import React, {useState} from "react";
import { toast } from 'react-toastify';

function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    }catch(error){
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 border-t border-slate-800">
      <h2 className="text-4xl font-semibold mb-4 text-center">Contact</h2>
      <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto text-center">
        Get in touch using the form
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 bg-slate-900/60 border border-slate-700 rounded-2xl p-6"
      >
        <div>
          <label className="block text-sm mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
            type="text"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
            required
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
