import { useState } from "react";
import { Tabs, Tab, Box, TextField, Button, Typography,Paper, LinearProgress, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/form_tabs.css';
import documentoGif from '../assets/img-no-opt/documento.gif'; 
import contrasenaGif from '../assets/img-no-opt/contrasena.gif'; 

const validationSchema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  apellidoPaterno: yup.string().required('El apellido paterno es obligatorio'),
  apellidoMaterno: yup.string().required('El apellido materno es obligatorio'),
  carrera: yup.string().required('Debes seleccionar una carrera'),
  correo: yup.string().email('Ingresa un correo electrónico válido').required('El correo es obligatorio'),
  contrasena: yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmarContrasena: yup.string()
    .oneOf([yup.ref('contrasena'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      className="preregistro-tabpanel"
      style={{ display: value === index ? 'flex' : 'none' }}
      {...other}
    >
      {value === index && (
        <Box className="preregistro-tabpanel-content">
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Form_RegistroEstudiante() {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const progress = tabIndex === 0 ? 50 : 100;
  const formik = useFormik({
    initialValues: {
      nombre: '', apellidoPaterno: '', apellidoMaterno: '', carrera: '', correo: '', contrasena: '', confirmarContrasena: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Registro de estudiante completado:", values);
      alert("¡Registro enviado con éxito!");
    },
  });
  const handleTabChange = (event, newValue) => {};
  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (tabIndex === 0) {
      formik.setFieldTouched('nombre', true);
      formik.setFieldTouched('apellidoPaterno', true);
      formik.setFieldTouched('apellidoMaterno', true);
      formik.setFieldTouched('carrera', true);
      
      if (!errors.nombre && !errors.apellidoPaterno && !errors.apellidoMaterno && !errors.carrera) {
        setTabIndex(1);
      }
    }
  };

  const carreras = [
    { value: 'ISC', label: 'Ingeniería en Sistemas Computacionales (ISC)' },
    { value: 'IIA', label: 'Ingeniería en Inteligencia Artificial (IIA)' },
    { value: 'LCD', label: 'Licenciatura en Ciencia de Datos (LCD)' }
  ];

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-3 preregistro-title">Registro de Estudiante</h1>
      
      <Box className="preregistro-container">
        <Box className="preregistro-progress-wrapper">
          <Box className="preregistro-progress-labels">
            <Typography variant="caption" color="text.secondary">Progreso del formulario</Typography>
            <Typography variant="caption" fontWeight="bold" color="primary">{progress}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            className="preregistro-progress-bg"
          />
        </Box>

        <Paper elevation={4} className="preregistro-paper">
          <form onSubmit={formik.handleSubmit} className="preregistro-form">
            
            <Tabs 
              value={tabIndex} 
              onChange={handleTabChange} 
              centered 
              indicatorColor="primary"
              textColor="primary"
              className="preregistro-tabs"
            >
              <Tab label="General" />
              <Tab label="Acceso" />
            </Tabs>

            {/*General*/}
            <TabPanel value={tabIndex} index={0}>
              <Box className="preregistro-fields-container">
                <TextField fullWidth size="small" margin="normal" label="Nombre(s)" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.nombre && Boolean(formik.errors.nombre)} helperText={formik.touched.nombre && formik.errors.nombre} />
                <TextField fullWidth size="small" margin="normal" label="Apellido Paterno" name="apellidoPaterno" value={formik.values.apellidoPaterno} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.apellidoPaterno && Boolean(formik.errors.apellidoPaterno)} helperText={formik.touched.apellidoPaterno && formik.errors.apellidoPaterno} />
                <TextField fullWidth size="small" margin="normal" label="Apellido Materno" name="apellidoMaterno" value={formik.values.apellidoMaterno} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.apellidoMaterno && Boolean(formik.errors.apellidoMaterno)} helperText={formik.touched.apellidoMaterno && formik.errors.apellidoMaterno} />
                
                {/*Carreras*/}
                <TextField 
                  select 
                  fullWidth 
                  size="small" 
                  margin="normal" 
                  label="Carrera" 
                  name="carrera" 
                  value={formik.values.carrera} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur} 
                  error={formik.touched.carrera && Boolean(formik.errors.carrera)} 
                  helperText={formik.touched.carrera && formik.errors.carrera}
                >
                  {carreras.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              
              <Box className="preregistro-action-area">
                <Box className="preregistro-image-wrapper">
                  <img src={documentoGif} alt="Documento Animado" className="preregistro-document-img" />
                </Box>
                <Button variant="contained" fullWidth onClick={handleNext} className="preregistro-btn">Siguiente paso</Button>
              </Box>
            </TabPanel>

            {/*Acceso */}
            <TabPanel value={tabIndex} index={1}>
              <Box className="preregistro-fields-container">
                <TextField fullWidth size="small" margin="normal" label="Correo Electrónico" name="correo" type="email" value={formik.values.correo} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.correo && Boolean(formik.errors.correo)} helperText={formik.touched.correo && formik.errors.correo} />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  margin="normal" 
                  label="Contraseña" 
                  name="contrasena" 
                  type={showPassword ? "text" : "password"} 
                  value={formik.values.contrasena} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur} 
                  error={formik.touched.contrasena && Boolean(formik.errors.contrasena)} 
                  helperText={formik.touched.contrasena && formik.errors.contrasena} 
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <i className="fi fi-rs-crossed-eye"></i> : <i className="fi fi-rr-eye"></i>}
                        </IconButton>
                      </InputAdornment>
                    ) 
                  }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  margin="normal" 
                  label="Confirmar Contraseña" 
                  name="confirmarContrasena" 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={formik.values.confirmarContrasena} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur} 
                  error={formik.touched.confirmarContrasena && Boolean(formik.errors.confirmarContrasena)} 
                  helperText={formik.touched.confirmarContrasena && formik.errors.confirmarContrasena} 
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                          {showConfirmPassword ? <i className="fi fi-rs-crossed-eye"></i> : <i className="fi fi-rr-eye"></i>}
                        </IconButton>
                      </InputAdornment>
                    ) 
                  }} 
                />
              </Box>
              
              <Box className="preregistro-action-area">
                <Box className="preregistro-image-wrapper">
                  <img src={contrasenaGif} alt="Contraseña Animada" className="preregistro-document-img" />
                </Box>
                <Box className="preregistro-button-container">
                  <Button variant="outlined" onClick={() => setTabIndex(0)} className="preregistro-btn preregistro-btn-back">Atrás</Button>
                  <Button type="submit" variant="contained" color="success" className="preregistro-btn preregistro-btn-next">Finalizar Registro</Button>
                </Box>
              </Box>
            </TabPanel>

          </form>
        </Paper>
      </Box>
    </main>
  );
}