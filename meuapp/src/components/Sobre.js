export default function Sobre(props) {
  return (
    <div className="sobre-info">
      <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{props.usuario}</h3>
      <span style={{ color: 'var(--accent-color)', fontWeight: 500, fontSize: '0.9rem' }}>{props.funcao}</span>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{props.anos} anos</p>
    </div>
  );
}
