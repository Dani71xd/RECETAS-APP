// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ya está autenticado, redirigir a Home
        navigation.replace('Home');
      }
      setInitializing(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return unsubscribe;
  }, []);

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('El correo electrónico es obligatorio');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Introduce un correo electrónico válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      return false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = () => {
    // Validar los campos antes de proceder
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.replace('Home');
      })
      .catch((error) => {
        // Traducción de errores comunes de Firebase para una mejor UX
        let errorMessage;
        switch(error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No existe ninguna cuenta con este correo electrónico';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Demasiados intentos fallidos. Inténtalo más tarde';
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert('Error', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Muestra un spinner mientras se verifica el estado de autenticación
  if (initializing) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Aquí podrías añadir un logo */}
        <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Delicias en Casa</Text>
<Text style={styles.logoSubtext}>Explora, cocina y disfruta</Text>

        </View>
        
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) validatePassword(text);
          }}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
        <TouchableOpacity 
          style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
  },
  logoSubtext: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#d9534f',
    marginBottom: 4,
  },
  errorText: {
    color: '#d9534f',
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ff6347',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotText: {
    color: '#1976d2',
    textAlign: 'right',
    marginTop: 12,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: '#64748b',
  },
  signupLink: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});