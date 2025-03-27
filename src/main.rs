use axum::Router;
use axum::routing::get;
use visualizer;
#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt::init();

    // Define application routes
    let app = Router::new().route("/", get(visualizer::index));

    // Create a TCP listener
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    // Log server start
    tracing::info!("Server running on http://localhost:3000");

    // Start the server
    axum::serve(listener, app).await;
}
