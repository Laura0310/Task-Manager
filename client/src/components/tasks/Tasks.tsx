import useTaskCounts from '../../hooks/useTaskCounts';
import NavBar from '../../layouts/Navbar';
import Button from '../../shared/Button';
import TaskFormModal from './TaskFormModal';
import ProgressBar from '../../shared/ProgressBar';
import TaskCard from '../../shared/TaskCard';
import useTasks from '../../hooks/useTasks';
import { useState, useMemo } from 'react';

const Tasks = (): JSX.Element => {
    const {
        tasks,
        selectedTask,
        modalOpen,
        isNewTask,
        setModalOpen,
        handleEdit,
        handleNewTask,
        handleDelete,
        handleSaveTask,
        setSelectedTask,
        loading,
    } = useTasks();
    const taskCounts = useTaskCounts(tasks);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const statusStyles: { [key: string]: { bgColor: string; borderColor: string; icon: string } } = {
        'TO_DO': { bgColor: 'bg-red-600/20', borderColor: 'border-red-600', icon: 'fa-solid fa-list' },
        'IN_PROGRESS': { bgColor: 'bg-yellow-600/20', borderColor: 'border-yellow-600', icon: 'fa-solid fa-spinner' },
        'DONE': { bgColor: 'bg-green-600/20', borderColor: 'border-green-600', icon: 'fa-solid fa-check-circle' },
    };

    const statusLabels: { [key: string]: string } = {
        'TO_DO': 'Por hacer',
        'IN_PROGRESS': 'En curso',
        'DONE': 'Completadas',
    };

    const filteredTasks = useMemo(() => {
        const filtered = { ...tasks };

        if (statusFilter !== 'ALL') {
            Object.keys(filtered).forEach(status => {
                if (status !== statusFilter) {
                    filtered[status] = [];
                }
            });
        }

        if (searchTerm.trim() !== '') {
            const lowerSearchTerm = searchTerm.toLowerCase();
            Object.keys(filtered).forEach(status => {
                filtered[status] = filtered[status].filter(task =>
                    task.title.toLowerCase().includes(lowerSearchTerm) ||
                    task.description.toLowerCase().includes(lowerSearchTerm)
                );
            });
        }

        return filtered;
    }, [tasks, statusFilter, searchTerm]);

    const hasAnyTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

    return (
        <div className='flex flex-col items-center justify-center p-4 gap-4 pt-20 min-h-screen h-auto'>
            <NavBar />

            <div className='w-full bg-white p-4 rounded-xl shadow mb-2'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex flex-col md:w-1/2'>
                        <p className='text-sm text-gray-600 mb-2'>Filtrar por estado:</p>
                        <div className='flex flex-wrap gap-2'>
                            <button
                                onClick={() => setStatusFilter('ALL')}
                                className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'ALL'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700'}`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setStatusFilter('TO_DO')}
                                className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'TO_DO'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700'}`}
                            >
                                Por hacer
                            </button>
                            <button
                                onClick={() => setStatusFilter('IN_PROGRESS')}
                                className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'IN_PROGRESS'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700'}`}
                            >
                                En curso
                            </button>
                            <button
                                onClick={() => setStatusFilter('DONE')}
                                className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'DONE'
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-100 text-gray-700'}`}
                            >
                                Completadas
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-1/2'>
                        <p className='text-sm text-gray-600 mb-2'>Buscar:</p>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Buscar por título o descripción...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='p-2 pl-8 border rounded w-full'
                            />
                            <i className='fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                                >
                                    <i className='fa fa-times'></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3 rounded-xl p-4 bg-white h-full min-h-[400px] w-full shadow'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col item-center justify-start'>
                        <h1 className='text-xl text-black/90'>Hola</h1>
                        <p className='text-sm text-black/80'>aquí están tus tareas</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Button
                            onClick={handleNewTask}
                            className='flex flex-row items-center gap-2 mb-4 text-white bg-violet-500 hover:bg-violet-600'
                        >
                            Añadir tarea
                            <i className='fa fa-solid fa-plus' />
                        </Button>
                    </div>
                </div>

                {hasAnyTasks && (
                    <ProgressBar
                        completed={taskCounts['DONE'] || 0}
                        total={Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
                    />
                )}
                {hasAnyTasks ? (
                    <div className='grid sm:grid-cols-3 gap-4 w-full mx-auto grid-cols-1'>
                        {['TO_DO', 'IN_PROGRESS', 'DONE'].map((status) => (
                            <div
                                key={status}
                                className={`p-4 border ${statusStyles[status].bgColor} ${statusStyles[status].borderColor} rounded-xl min-h-[300px]`}
                            >
                                <div className='flex flex-row gap-2 items-center mb-2 justify-between'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <i className={`fa ${statusStyles[status].icon} text-center`} />
                                        <h2 className='text-base text-center'>{statusLabels[status]}</h2>
                                    </div>
                                    <span className='bg-white text-xs font-medium px-2 py-1 rounded-full shadow-sm'>
                                        {filteredTasks[status] ? filteredTasks[status].length : 0}
                                    </span>
                                </div>
                                {filteredTasks[status] && filteredTasks[status].length > 0 ? (
                                    filteredTasks[status].map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                ) : (
                                    <div className='flex flex-col items-center justify-center w-full h-[200px] text-gray-400'>
                                        <i className='fa fa-regular fa-folder-open text-2xl mb-2'></i>
                                        <p className='text-xs'>No hay tareas</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center w-full flex-1 mt-10'>
                        <i className='fa fa-regular fa-folder-open text-gray-600 text-3xl' />
                        <p className='text-sm text-gray-500'>
                            Aún no tienes tareas. Añade una para comenzar.
                        </p>
                    </div>
                )}
            </div>
            <TaskFormModal
                isOpen={modalOpen}
                isNewTask={isNewTask}
                selectedTask={selectedTask}
                loading={loading}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveTask}
                setSelectedTask={setSelectedTask}
            />
        </div>
    );
};

export default Tasks;