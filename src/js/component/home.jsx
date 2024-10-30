import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
	const [formData, setFormData] = useState({
		tarea: '',
		done: false
	});
	const [tareas, setTareas] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (formData.tarea.trim() !== '') {
			setTareas([...tareas, { text: formData.tarea, id: Date.now() }]);
			setFormData({ ...formData, tarea: '' });
		}
	};

	const handleCambioConObjeto = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleEliminar = (id) => {
		setTareas(tareas.filter((tarea) => tarea.id !== id));
	};

	return (
		<div className="container mt-4">
			<h2 className="text-center mb-4">Todo List</h2>
			<p className="text-center text-muted">Total de tareas: {tareas.length}</p>
			<form onSubmit={handleSubmit} className="d-flex justify-content-center mb-3">
				<div className="input-group w-50">
					<input
						value={formData.tarea}
						onChange={handleCambioConObjeto}
						onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
						name="tarea"
						type="text"
						className="form-control"
						placeholder="Comienza a escribir"
					/>
				</div>
			</form>
			<div className="container">
				{tareas.length === 0 ? (
					<p className="text-muted text-center">No hay tareas, añadir tareas</p>
				) : (
					<ul className="list-group">
						{tareas.map((tarea) => (
							<li
								key={tarea.id}
								className="list-group-item d-flex justify-content-between align-items-center"
								onMouseEnter={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'inline')}
								onMouseLeave={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'none')}
							>
								{tarea.text}
								<button
									className="btn btn-sm btn-danger delete-btn"
									style={{ display: 'none' }}
									onClick={() => handleEliminar(tarea.id)}
								>
									&times;
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Home;
