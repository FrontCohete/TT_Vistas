import { useState } from "react";
import { Tabs, Tab, Box, TextField, Button, Typography, Paper, LinearProgress, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/form_tabs.css'; 

const validationSchema = yup.object({
  nombre: yup.string().required('El nombre o razón social es obligatorio'),
  giro: yup.string().required('El giro es obligatorio'),
  sector: yup.string().required('El sector es obligatorio'),
  rfc: yup.string()
    .matches(/^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{3}$/i, 'Formato de RFC inválido')
    .required('El RFC es obligatorio'),
  constancia: yup.mixed().required('Debes adjuntar tu constancia'),
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

export default function Form_PreR() {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const progress = tabIndex === 0 ? 33 : tabIndex === 1 ? 66 : 100;

  const formik = useFormik({
    initialValues: {
      nombre: '', giro: '', sector: '', rfc: '', constancia: null, correo: '', contrasena: '', confirmarContrasena: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Registro completado con éxito:", values);
      alert("¡Preregistro enviado!");
    },
  });

  const handleTabChange = (event, newValue) => {};

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (tabIndex === 0) {
      formik.setFieldTouched('nombre', true);
      formik.setFieldTouched('giro', true);
      formik.setFieldTouched('sector', true);
      if (!errors.nombre && !errors.giro && !errors.sector) setTabIndex(1);
    } else if (tabIndex === 1) {
      formik.setFieldTouched('rfc', true);
      formik.setFieldTouched('constancia', true);
      if (!errors.rfc && !errors.constancia) setTabIndex(2);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      formik.setFieldValue('constancia', e.dataTransfer.files[0]);
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-3 preregistro-title">Preregistro de Usuario</h1>
      
      <Box className="preregistro-container">
        <Box sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
              <Tab label="Fiscal" />
              <Tab label="Acceso" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField fullWidth size="small" margin="normal" label="Nombre / Razón Social" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.nombre && Boolean(formik.errors.nombre)} helperText={formik.touched.nombre && formik.errors.nombre} />
                <TextField fullWidth size="small" margin="normal" label="Giro" name="giro" value={formik.values.giro} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.giro && Boolean(formik.errors.giro)} helperText={formik.touched.giro && formik.errors.giro} />
                <TextField fullWidth size="small" margin="normal" label="Sector" name="sector" value={formik.values.sector} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.sector && Boolean(formik.errors.sector)} helperText={formik.touched.sector && formik.errors.sector} />
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Button variant="contained" fullWidth onClick={handleNext} className="preregistro-btn">Siguiente paso</Button>
              </Box>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField fullWidth size="small" margin="normal" label="RFC" name="rfc" value={formik.values.rfc} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.rfc && Boolean(formik.errors.rfc)} helperText={formik.touched.rfc && formik.errors.rfc} />
                
                <Box 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`preregistro-dropzone ${formik.values.constancia ? 'has-file' : 'is-empty'} ${formik.touched.constancia && formik.errors.constancia ? 'has-error' : ''}`}
                  component="label"
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>Arrastra aquí tu Constancia de Situación Fiscal o haz clic para subirla</Typography>
                  <input type="file" name="constancia" hidden onChange={(event) => formik.setFieldValue("constancia", event.currentTarget.files[0])} />
                  <Button variant="outlined" component="span" size="small" sx={{ mt: 1 }}>Seleccionar Archivo</Button>
                </Box>
                
                {formik.touched.constancia && formik.errors.constancia ? (
                  <Typography variant="caption" color="error" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>{formik.errors.constancia}</Typography>
                ) : (
                  <Typography variant="caption" color={formik.values.constancia ? "success.main" : "text.secondary"} sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                    {formik.values.constancia ? `✓ Archivo cargado: ${formik.values.constancia.name}` : 'Ningún archivo seleccionado'}
                  </Typography>
                )}
              </Box>
              <Box className="preregistro-button-container">
                <Button variant="outlined" onClick={() => setTabIndex(0)} className="preregistro-btn preregistro-btn-back">Atrás</Button>
                <Button variant="contained" onClick={handleNext} className="preregistro-btn preregistro-btn-next">Siguiente paso</Button>
              </Box>
            </TabPanel>

            <TabPanel value={tabIndex} index={2}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField fullWidth size="small" margin="normal" label="Correo Electrónico" name="correo" type="email" value={formik.values.correo} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.correo && Boolean(formik.errors.correo)} helperText={formik.touched.correo && formik.errors.correo} />
                <TextField fullWidth size="small" margin="normal" label="Contraseña" name="contrasena" type={showPassword ? "text" : "password"} value={formik.values.contrasena} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.contrasena && Boolean(formik.errors.contrasena)} helperText={formik.touched.contrasena && formik.errors.contrasena} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">{showPassword ? "🙈" : "👁️"}</IconButton></InputAdornment>) }} />
                <TextField fullWidth size="small" margin="normal" label="Confirmar Contraseña" name="confirmarContrasena" type={showConfirmPassword ? "text" : "password"} value={formik.values.confirmarContrasena} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.confirmarContrasena && Boolean(formik.errors.confirmarContrasena)} helperText={formik.touched.confirmarContrasena && formik.errors.confirmarContrasena} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">{showConfirmPassword ? "🙈" : "👁️"}</IconButton></InputAdornment>) }} />
              </Box>
              <Box className="preregistro-button-container">
                <Button variant="outlined" onClick={() => setTabIndex(1)} className="preregistro-btn preregistro-btn-back">Atrás</Button>
                <Button type="submit" variant="contained" color="success" className="preregistro-btn preregistro-btn-next">Finalizar Registro</Button>
              </Box>
            </TabPanel>

          </form>
        </Paper>
      </Box>
    </main>
  );
}