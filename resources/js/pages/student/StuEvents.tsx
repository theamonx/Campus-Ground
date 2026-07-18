import { useState } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  X,
} from "lucide-react";

export function StuEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Winter Hackathon 2025",
      organiser: "Dev Club",
      date: "Nov 22–23",
      venue: "Lab Block 3",
      registered: true,
      spots: "32 left",
      tag: "Hackathon",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=240&fit=crop&auto=format",
    },
    {
      id: 2,
      title: "Photography Walk — Monsoon Series",
      organiser: "Photo Society",
      date: "Nov 24",
      venue: "Campus Gardens",
      registered: false,
      spots: "18 left",
      tag: "Workshop",
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=240&fit=crop&auto=format",
    },
    {
      id: 3,
      title: "Startup Pitch Night #8",
      organiser: "E-Cell",
      date: "Dec 1",
      venue: "Seminar Hall A",
      registered: false,
      spots: "10 left",
      tag: "Networking",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=240&fit=crop&auto=format",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    organiser: "",
    date: "",
    venue: "",
    tag: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter an event title.");
      return;
    }

    setEvents((prev) => [
      {
        id: Date.now(),
        title: formData.title,
        organiser: formData.organiser || "Student Organization",
        date: formData.date || "TBA",
        venue: formData.venue || "Campus",
        registered: false,
        spots: "Open Registration",
        tag: formData.tag || "Campus Event",
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=240&fit=crop&auto=format",
      },
      ...prev,
    ]);

    setFormData({
      title: "",
      organiser: "",
      date: "",
      venue: "",
      tag: "",
      image: "",
    });
    setImagePreview("");
    setShowForm(false);
  };

  const toggleRegistration = (id: number) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, registered: !event.registered }
          : event
      )
    );
  };

  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Events
            </h1>

            <p className="text-sm text-muted-foreground">
              Student-organised events and registrations
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            <Plus size={15} />
            Create Event
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 transition"
            >
              <div className="relative h-44">
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] bg-black/50 text-white border border-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    {e.tag}
                  </span>
                </div>

                {e.registered && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 text-[10px] bg-green-500 text-white px-2 py-1 rounded-full">
                      <CheckCircle size={10} />
                      Registered
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4">
                  <h2 className="text-white font-bold text-lg">
                    {e.title}
                  </h2>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {e.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {e.venue}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {e.organiser}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-accent">
                    {e.spots}
                  </span>

                  <button
                    onClick={() =>
                      toggleRegistration(e.id)
                    }
                    className={`px-4 py-2 rounded-lg text-sm transition ${e.registered
                      ? "bg-secondary border border-border"
                      : "bg-primary text-background"
                      }`}
                  >
                    {e.registered
                      ? "View Registration"
                      : "Register Now →"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl">

            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-xl font-bold">
                Create New Event
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setImagePreview("");
                  setFormData({
                    title: "",
                    organiser: "",
                    date: "",
                    venue: "",
                    tag: "",
                    image: "",
                  });
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <input
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                name="organiser"
                placeholder="Organiser"
                value={formData.organiser}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <input
                name="tag"
                placeholder="Category"
                value={formData.tag}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background p-3"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Event Banner
                </label>

                <label
                  htmlFor="event-image"
                  className="w-full h-56 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Plus size={34} />
                      <p className="mt-3 font-medium">
                        Click to Upload Image
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, JPEG, WEBP
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="event-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-border">

              <button
                onClick={() => {
                  setShowForm(false);
                  setImagePreview("");
                  setFormData({
                    title: "",
                    organiser: "",
                    date: "",
                    venue: "",
                    tag: "",
                    image: "",
                  });
                }}
                className="px-5 py-2 rounded-lg border border-border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-primary text-background"
              >
                Create Event
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}