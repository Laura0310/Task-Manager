import React, { useState, useEffect } from 'react';
import Modal from '../../shared/Modal';
import Button from '../../shared/Button';
import Loader from '../../shared/Loader';
import CustomSelect from '../../shared/CustomSelect';
import { Task } from '../../types/task';

interface TaskFormModalProps {
    isOpen: boolean;
    isNewTask: boolean;
    selectedTask: Task | null;
    loading: boolean;
    onClose: () => void;
    onSave: () => void;
    setSelectedTask: (task: Task) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
    isOpen,
    isNewTask,
    selectedTask,
    loading,
    onClose,
    onSave,
    setSelectedTask
}) => {
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        setTitleError('');
    }, [isOpen]);

    const statusOptions = [
        { value: 'TO_DO', label: 'Pendiente' },
        { value: 'IN_PROGRESS', label: 'En progreso' },
        { value: 'DONE', label: 'Completado' }
    ];

    const handleClose = () => {
        setTitleError('');
        onClose();
    };

    const handleSave = () => {
        if (!selectedTask?.title || selectedTask.title.trim() === '') {
            setTitleError('El título es obligatorio');
            return;
        }
        setTitleError('');
        onSave();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTask({ ...selectedTask!, title: e.target.value });
        if (e.target.value.trim() !== '') {
            setTitleError('');
        }
    };

    return (
        <Modal isOpen={isOpen} title={isNewTask ? 'Nueva Tarea' : 'Editar Tarea'} onClose={handleClose}>
            <label className='text-sm mb-1 block'>Título <span className="text-red-500">*</span></label>
            <input
                type='text'
                className={`p-2 border rounded w-full mb-1 ${titleError ? 'border-red-500' : ''}`}
                value={selectedTask?.title || ''}
                onChange={handleTitleChange}
            />
            {titleError && <p className="text-red-500 text-xs mb-3">{titleError}</p>}
            {!titleError && <div className="mb-3"></div>}

            <label className='text-sm mb-1 block'>Descripción</label>
            <textarea
                className='p-2 border rounded w-full mb-3'
                value={selectedTask?.description || ''}
                onChange={(e) => setSelectedTask({ ...selectedTask!, description: e.target.value })}
            />

            <CustomSelect
                label="Estado"
                options={statusOptions}
                value={selectedTask?.status || 'TO_DO'}
                onChange={(value) => setSelectedTask({ ...selectedTask!, status: value as Task['status'] })}
            />

            {loading ? (
                <Loader />
            ) : (
                <div className='flex gap-2 mt-5'>
                    <Button onClick={handleSave} className='bg-violet-800 hover:bg-violet-900 w-1/2 text-white'>
                        Guardar
                    </Button>
                    <Button onClick={handleClose} className='w-1/2 text-violet-400 hover:text-violet-500'>
                        Cancelar
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default TaskFormModal;