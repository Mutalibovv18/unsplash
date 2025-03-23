import React from "react";

function About() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Unsplash Explorer</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Unsplash Explorer is a platform dedicated to providing high-quality, royalty-free images 
        from talented photographers worldwide. Whether you're a designer, writer, or creative professional, 
        you’ll find stunning visuals to enhance your projects.
      </p>

      <div className="mt-6 space-y-4 text-gray-700 text-lg">
        <p>
          Our mission is to make high-resolution photography accessible to everyone while supporting 
          creators who bring beauty and inspiration through their work.
        </p>
        <p>
          With an ever-growing library, Unsplash Explorer allows users to search, discover, and explore 
          breathtaking visuals across different categories, making it an essential resource for creative minds.
        </p>
        <p>
          Every image tells a story, and through this platform, we connect photographers with people who 
          appreciate and use their art in meaningful ways.
        </p>
      </div>
    </div>
  );
}

export default About;
