import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import swal from "sweetalert";
function AdminsPage({ swal }) {
  const [email, setEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function addAdmin(ev) {
    ev.preventDefault();
    axios.post("/api/admins", { email }).then((res) => {
      console.log(res.data);
      swal.fire({
        title: "Admin created!",
        icon: "success",
      });
      setEmail("");
      loadAdmins();
    });
  }

  function deleteAdmin(id, email) {
    swal
      .fire({
        title: `Are you sure that you want to delete admin ${email}?`,
        text: "Once deleted, you will not be able to recover this admin.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
        dangerMode: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/api/admins?id=${id}`);
            swal.fire({
              title: "Admin Deleted!",
              icon: "success",
            });
            loadAdmins();
          } catch (error) {
            console.error("Error deleting admin:", error);
            swal.fire({
              title: "Error!",
              text: "There was an error deleting the admin.",
              icon: "error",
            });
          }
        }
      });
  }
  function loadAdmins() {
    setIsLoading(true);
    axios.get("/api/admins").then((response) => {
      setAdminEmail(response.data);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <Layout>
      <h1>Admins </h1>
      <h2>Add new Admins</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mb-0"
            placeholder="google email"
          />
          <button type="submit" className="btn-primary py-1 whitespace-nowrap ">
            Add admin
          </button>
        </div>
      </form>
      <h2>Existing Admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Admin google Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {adminEmail.length > 0 &&
            adminEmail.map((email) => {
              const { createdAt } = email;
              const date = new Date(
                createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
              );
              const formattedDate = date.toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              });
              return (
                <tr key={email.id}>
                  <td>{email.email}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <button
                      onClick={() => deleteAdmin(email.id, email.email)}
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }) => <AdminsPage swal={swal} />);
