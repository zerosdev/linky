from pydantic import BaseModel, ConfigDict, HttpUrl


class CreateUrlRequest(BaseModel):
    original_url: HttpUrl


class UrlResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    slug: str
    original_url: HttpUrl
