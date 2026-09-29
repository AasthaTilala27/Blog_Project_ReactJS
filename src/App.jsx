import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [blogData, setBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [isadd, setIsAdd] = useState(true);
  const [id, setId] = useState(null);
  const API = "http://localhost:3000/blogs";

  const getData = () => {

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {

      res.json().then((data) => {

        setBlogData(data);

      })

    })
  }

  useEffect(() => {

    getData();

  }, []);


  const handleSubmit = (e) => {

    e.preventDefault();

    if (id) {

      const blog = {
        title,
        image,
        category,
        description,
        author
      }

      fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      }).then((res) => {

        res.json().then((data) => {

          console.log(data);

          alert("Blog Updated");

          setTitle("");
          setImage("");
          setCategory("");
          setDescription("");
          setAuthor("");

          setId(null);
          setIsAdd(true);

          getData();

        })

      })

    } else {

      const blog = {
        title,
        image,
        category,
        description,
        author
      }

      fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      }).then((res) => {

        res.json().then((data) => {

          console.log(data);

          alert("Blog Added");

          setTitle("");
          setImage("");
          setCategory("");
          setDescription("");
          setAuthor("");

          getData();

        })

      })

    }

  }

  const handleDelete = (id) => {

    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {

      res.json().then((data) => {

        console.log(data);

        alert("Blog Deleted");

        getData();

      })

    })
  }

  const handleEdit = (element) => {
    setIsAdd(false);
    setId(element.id);
    setTitle(element.title);
    setImage(element.image);
    setCategory(element.category);
    setDescription(element.description);
    setAuthor(element.author);

  }

  const handleCancel = () => {
    setIsAdd(true);
    setId(null);
    setTitle("");
    setImage("");
    setCategory("");
    setDescription("");
    setAuthor("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa"
      }}
    >

     
      <nav
        className="navbar"
        style={{
          backgroundColor: "#343a40"
        }}
      >

        <div className="container">

          <h3 className="text-white fw-bold mb-0">
            My Blog
          </h3>

          <span className="text-light">
            Blog Project
          </span>

        </div>

      </nav>


      <div className="container-fluid">

        <div className="row">

          <div
            className="col-lg-3 bg-white p-4"
            style={{
              minHeight: "calc(100vh - 56px)",
              borderRight: "1px solid #ddd"
            }}
          >

            <div className="text-center mb-4">

              <div
                className="mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "65px",
                  height: "65px",
                  borderRadius: "50%",
                  backgroundColor: "#141213",
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "bold"
                }}
              >
                B
              </div>

              <h5 className="fw-bold mt-2">
                Blog Manager
              </h5>

            </div>

            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => {
                handleCancel();
              }}
            >
              All Blogs
            </button>

            <button
              className="btn btn-outline-primary w-100 mb-4"
              onClick={() => {

                setIsAdd(true);
                setId(null);

                setTitle("");
                setImage("");
                setCategory("");
                setDescription("");
                setAuthor("");

              }}
            >
              Add New Blog
            </button>
                  <hr />


            <h5 className="fw-bold mb-3">

              {isadd ? "Add Blog" : "Edit Blog"}

            </h5>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  required
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value)
                  }}
                  required
                />

              </div>


              <div className="mb-3">
                <label className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                  required
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Author
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter author"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                  }}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className={
                  isadd
                    ? "btn btn-success w-100"
                    : "btn btn-warning w-100"
                }
              >

                {isadd ? "Add Blog" : "Update Blog"}

              </button>

              {!isadd && (

                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="col-lg-9 p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">
                  All Blogs
                </h2>

                <p className="text-secondary mb-0">
                  Latest blog posts
                </p>

              </div>

              <span className="badge bg-primary p-2">
                {blogData.length} Blogs
              </span>

            </div>

            <div className="row">
              {
                blogData.map((element, index) => {
                  return (
                    <div
                      className="col-xl-4 col-md-6 mb-4"
                      key={element.id}
                    >
                      <div
                        className="card h-100 shadow-sm"
                        style={{
                          border: "none",
                          borderRadius: "10px"
                        }}
                      >
                        <img
                          src={element.image}
                          alt={element.title}
                          className="card-img-top"
                          style={{
                            height: "180px",
                            objectFit: "cover"
                          }}
                        />
                        <div className="card-body">

                          <div className="d-flex justify-content-between mb-2">

                            <span className="badge bg-info text-dark">
                              {element.category}
                            </span>

                            <small className="text-secondary">
                              #{index + 1}
                            </small>

                          </div>
                          <h5 className="card-title fw-bold">
                            {element.title}
                          </h5>


                          <p className="card-text text-secondary">
                            {element.description}
                          </p>


                          <p className="mb-3">

                            <strong>Author:</strong>{" "}
                            {element.author}

                          </p>


                          <div className="d-flex gap-2">

                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                handleEdit(element)
                              }}
                            >
                              Edit
                            </button>


                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                handleDelete(element.id)
                              }}
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App;