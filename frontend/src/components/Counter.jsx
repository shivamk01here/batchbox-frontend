import { useState } from "react";

export default function WaifuImageChanger() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://waifu.pics/api/many/nsfw/waifu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: [] }),
      });

      const data = await response.json();
      setImages(data.files);
      setIndex(0);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
      {images.length > 0 && (
        <img src={images[index]} alt="waifu" className="max-h-[400px] rounded-xl shadow-lg" />
      )}
      <button
        onClick={images.length ? nextImage : fetchImages}
        className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition"
      >
        {images.length ? "Next Waifu" : "Get Waifus"}
      </button>
    </div>
  );
}
