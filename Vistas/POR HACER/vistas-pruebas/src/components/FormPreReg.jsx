import { useState, useRef } from "react";
import { Tabs, Tab, Box, TextField, Button, Typography, Paper } from '@mui/material';
import 'normalize.css';
import '../assets/css/form_prereg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente auxiliar de MUI para renderizar el contenido de cada pestaña
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, pb: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Form_PreR() {
  // 1. Estados del formulario
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    rfc: '',
    archivo: null
  });

  // (Opcional) Si importaste useRef para algo en específico, puedes declararlo aquí
  // const fileInputRef = useRef(null);

  // 2. Funciones manejadoras
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del Preregistro listos:", formData);
    // Lógica para enviar al backend
  };

  // 3. Renderizado del componente
  return (
    <>
      {/* Usando una clase de Bootstrap 'container' y 'mt-4' para centrar y dar margen si lo deseas */}
      <main className="container mt-4">
        <h1 className="text-center mb-4">Preregistro</h1>
        
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              
              {/* Navegación de Pestañas */}
              <Tabs 
                value={tabIndex} 
                onChange={handleTabChange} 
                centered 
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="1. Accesos" />
                <Tab label="2. Datos Personales" />
              </Tabs>

              {/* PANEL 1: Correo y Contraseña */}
              <TabPanel value={tabIndex} index={0}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Correo Electrónico"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Contraseña"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  required
                />
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 3 }}
                  onClick={() => setTabIndex(1)}
                >
                  Siguiente
                </Button>
              </TabPanel>

              {/* PANEL 2: Nombre, RFC y Archivo */}
              <TabPanel value={tabIndex} index={1}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre Completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="RFC"
                  name="rfc"
                  value={formData.rfc}
                  onChange={handleInputChange}
                  required
                />
                
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mt: 2, mb: 1, py: 1.5 }}
                >
                  Adjuntar Archivo
                  <input
                    type="file"
                    name="archivo"
                    hidden
                    onChange={handleInputChange}
                  />
                </Button>
                
                <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                  {formData.archivo ? formData.archivo.name : 'Ningún archivo seleccionado'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button 
                    variant="text" 
                    onClick={() => setTabIndex(0)} 
                    fullWidth
                  >
                    Atrás
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                  >
                    Completar Preregistro
                  </Button>
                </Box>
              </TabPanel>

            </form>
          </Paper>
        </Box>
      </main>
    </>
  );
}