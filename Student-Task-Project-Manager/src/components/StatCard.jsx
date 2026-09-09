function StatCard( props ) {
    return (
        <div className="stat-card">
            <h3>{props.title}</h3>
            <h2>{props.value}</h2>
        </div>
    );
}

export default StatCard;