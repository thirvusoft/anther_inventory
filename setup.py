from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in anther_inventory/__init__.py
from anther_inventory import __version__ as version

setup(
	name="anther_inventory",
	version=version,
	description="Anther Inventory",
	author="Anther",
	author_email="Anther",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
