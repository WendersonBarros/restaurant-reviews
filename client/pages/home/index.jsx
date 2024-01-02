import "./styles.module.scss";
import { useState } from "react";
import Form from "./components/form";
import List from "./components/list";

export default function Home() {
  const [filters, setFilters] = useState({});

  return (
    <main>
      <Form
        setFilters={setFilters}
      />

      <List
        filters={filters}
      />
    </main>
  )
}
