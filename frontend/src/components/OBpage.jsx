import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OBPage() {
  const { obpage } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/get-ob-details/${obpage}`)
      .then(({ data }) => setData(data))
      .catch(err => console.error('Error fetching OB page:', err));
  }, [obpage]);

  if (!data) return <div className="text-center py-10 text-lg font-medium text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center space-x-4">
          <img src={data.institution.logo} alt="Logo" className="h-12 w-12 object-contain rounded-md border" />
          <h1 className="text-2xl font-bold text-gray-800">{data.institution.name}</h1>
        </div>
      </header>

      {/* Institution Info */}
      <section className="max-w-4xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <p className="text-gray-600 italic text-lg">"{data.institution.moto}"</p>
          <p className="text-gray-700">{data.institution.description}</p>
        </div>
      </section>

      {/* Classes */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Classes</h2>
        {Object.entries(data.classes).map(([subject, classes]) => (
          <div key={subject} className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-3">{subject}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {classes.map(cls => (
                <div
                  key={cls.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-200 border"
                >
                  <h4 className="text-lg font-semibold text-gray-900">{cls.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
    