use askama::Template;
use axum::{
    Form, Router,
    extract::State,
    http::StatusCode,
    response::{Html, IntoResponse},
    routing::{get, post},
};
use serde::Deserialize;
use std::sync::{Arc, Mutex};
use tracing_subscriber;

// Shared state for the application
#[derive(Clone, Default)]
pub struct AppState {
    pub counter: Arc<Mutex<u8>>,
}

// Define a struct for subscriber form data
//#[derive(Deserialize, Validate)]
//pub struct SubscriberForm {
//    #[validate(email(message = "Invalid email address"))]
//    pub email: String,
//}

// Helper struct to wrap Askama templates
pub struct HtmlTemplate<T>(pub T);

// NOTE: This converts any type T that implements the askama::Template trait into an http response
impl<T: askama::Template> IntoResponse for HtmlTemplate<T> {
    fn into_response(self) -> axum::response::Response {
        match self.0.render() {
            Ok(html) => Html(html).into_response(),
            Err(err) => {
                tracing::error!("Failed to render template: {}", err);
                (
                    axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                    "Internal Server Error",
                )
                    .into_response()
            }
        }
    }
}

// NOTE: ASKAMA IS A TEMPLATE ENGINE
// THE TEMPLATE TRAIT MUST BE DERIVED
// The derive macro essentially does the hard work of turning your struct into a renderable template
// making it much easier to generate dynamic HTML in Rust.
#[derive(Template)]
// NOTE: The line below is an attribute that tells the engine where to look for the template
#[template(path = "index.html")]
//NOTE: The struct IndexTemplate derives this template defined in index.html
// NOTE: All file names passed assined to path keyword are assumed to be in templates/example.html
// unless otherwise specified
pub struct IndexTemplate;

// Handler for the main landing page
pub async fn index() -> impl IntoResponse {
    let template = IndexTemplate;
    HtmlTemplate(template)
}

// Handler for email signup
//pub async fn subscribe(Form(form): Form<SubscriberForm>) -> impl IntoResponse {
//    match form.validate() {
//        Ok(_) => {
//            // TODO: In a real app, you'd:
//            // 1. Check if email already exists
//            // 2. Save to database
//            // 3. Send confirmation email
//            Html("Thanks for signing up!")
//        }
//        Err(_) => Html("Invalid email address"),
//    }
//}

// Application setup function
pub async fn run_server() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize logging
    tracing_subscriber::fmt::init();

    // Define application routes
    let app = Router::new().route("/", get(index));

    // Create a TCP listener
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await?;

    // Log server start
    tracing::info!("Server running on http://localhost:3000");

    // Start the server
    axum::serve(listener, app).await?;

    Ok(())
}
//----------------------------------------------------------------------------------------------------

// EXAMPLE OF ASKAMA TEMPLATE
#[derive(Template)]
#[template(path = "example.html")]
pub struct ExampleTemplate {
    pub name: String,
    pub age: u32,
}
// NOTE: ExampleTemplate can now be used.
// Askama checks the templates at compiletime, but only renders at runtime
