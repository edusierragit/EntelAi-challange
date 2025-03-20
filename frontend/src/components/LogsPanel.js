import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente que muestra los logs de la aplicación
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.show - Si se muestra el panel
 * @param {Array} props.logs - Lista de logs a mostrar
 * @returns {JSX.Element|null} - Componente de panel de logs o null si no se muestra
 */
const LogsPanel = ({ show, logs }) => {
  if (!show) return null;
  
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header bg-secondary text-white">
            Registro de actividad 
          </div>
          <div className="card-body" style={{maxHeight: '200px', overflowY: 'scroll'}}>
            <ul className="list-group">
              {logs.map((log, index) => (
                <li key={index} className="list-group-item">
                  <small className="text-muted">{log.time}:</small> {log.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

LogsPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired
};

export default LogsPanel; 