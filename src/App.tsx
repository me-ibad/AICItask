import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;

  phone: string;
  website: string;
}

const App: React.FC = () => {
  const [counter, setCounter] = useState<number>(1);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${counter}`
        );
        const data: User = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [counter]);

  const incrementCounter = () => {
    if (counter < 10) setCounter((prevCounter) => prevCounter + 1);
  };

  const decrementCounter = () => {
    if (counter > 1) setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <div className='grid place-items-center h-screen	 '>
      <div>
        <div>
          <button onClick={decrementCounter} disabled={counter === 1}>
            Previous
          </button>
          <span className='mx-2 font-bold'> {counter}</span>

          <button onClick={incrementCounter} disabled={counter === 10}>
            Next
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          userData && (
            <div className='mt-14 shadow-lg p-6 rounded border border-blue-500'>
              <p>
                <strong className=''>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Website:</strong> {userData.website}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
