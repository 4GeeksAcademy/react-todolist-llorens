import React, { useState } from "react";

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
		<div className="text-center">
			<h2>Todo list</h2>
			<form onSubmit={handleSubmit}>
				<input
					value={formData.tarea}
					onChange={handleCambioConObjeto}
					name="tarea"
					type="text"
					placeholder="Comienza a escribir"
				/>
			</form>
			<div className="container">
				{tareas.length === 0 ? (
					<p>No hay tareas, añadir tareas</p>
				) : (
					<ul>
						{tareas.map((tarea) => (
							<li
								key={tarea.id}
								style={{ position: 'relative', listStyle: 'none', padding: '8px' }}
								onMouseEnter={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'inline')}
								onMouseLeave={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'none')}
							>
								{tarea.text}
								<button
									className="delete-btn"
									style={{ display: 'none', marginLeft: '10px' }}
									onClick={() => handleEliminar(tarea.id)}
								>
									X
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
