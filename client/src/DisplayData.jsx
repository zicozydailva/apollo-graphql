import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
// useLazyQuery hook fetchs data on commend
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      married
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  //   create user name
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>List of Users</h1>
      <div className="">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name ..."
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Age ..."
        />
        <button
          onClick={() => createUser({ variables: { input: name, age: Number(age) } }, refetch())}
        >
          Create User
        </button>
      </div>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id} className="">
              <h1>Name: {user.name}</h1>
              <h4>Age: {user.age}</h4>
            </div>
          );
        })}
      <h1>List Of Movies</h1>
      {movieData &&
        movieData.movies.map((user) => {
          return (
            <div key={user.id} className="">
              <h1>Name: {user.name}</h1>
              <h4>Age: {user.age}</h4>
            </div>
          );
        })}

      <div className="">
        <input
          onChange={(e) => setMovieSearched(e.target.value)}
          type="text"
          placeholder="Interstellar..."
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }
        >
          fetch Data
        </button>
        <div className="">
          {movieSearchData && (
            <div className="">
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1>Error with fetching movie.. </h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
