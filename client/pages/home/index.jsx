import './styles.module.scss';
import { useState } from 'react';
import Form from './components/form';
import List from './components/list';

export default function Home() {
    const [filters, setFilters] = useState({});
    const [restaurants, setRestaurants] = useState([]);

    return (
        <main>
            <Form
                setFilters={setFilters}
                restaurants={restaurants}
                setRestaurants={setRestaurants}
            />

            <List
                filters={filters}
                restaurants={restaurants}
                setRestaurants={setRestaurants}
            />
        </main>
    );
}
