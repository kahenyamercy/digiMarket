#!/usr/bin/python3


class BaseModel():
    """Base class for all models in the application."""
    def to_json(self):
        """Returns a JSON representation of an object. This method must be implemented by subclasses."""
        new_dict = self.__dict__.copy()
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        if "password" in new_dict:
            del new_dict ["password"]  # Don't expose password field when serializing user objects
        return new_dict